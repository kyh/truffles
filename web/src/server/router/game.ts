import { Scene } from "@prisma/client";
import { t, ServerError } from "~/server/trpc";
import { z } from "zod";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890", 5);

export const gameRouter = t.router({
  create: t.procedure
    .input(z.object({ packId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const pack = await ctx.prisma.pack.findUnique({
        where: {
          id: input.packId,
        },
      });

      if (!pack) {
        throw new ServerError({
          code: "BAD_REQUEST",
          message: "Invalid packId.",
        });
      }

      let scenes: Scene[] = [];
      if (pack.isRandom) {
        scenes = await ctx.prisma.$queryRawUnsafe(
          `SELECT * FROM "Scene" WHERE "packId"='${input.packId}' ORDER BY RANDOM() LIMIT ${pack.gameLength};`
        );
      } else {
        scenes = await ctx.prisma.scene.findMany({
          where: {
            packId: input.packId,
          },
          orderBy: {
            order: "asc",
          },
          take: pack.gameLength,
        });
      }

      const gameCode = nanoid();

      const game = await ctx.prisma.game.create({
        data: {
          code: gameCode,
          state: {
            currentScene: 0,
            currentStep: 0,
          },
          gameScenes: scenes.map((s) => s.id),
          packId: input.packId,
        },
      });

      return game;
    }),
  check: t.procedure
    .input(z.object({ code: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const game = await ctx.prisma.game.findUnique({
        where: {
          code: input.code,
        },
      });

      if (!game) {
        throw new ServerError({
          code: "BAD_REQUEST",
          message: "Invalid game code.",
        });
      }

      return game;
    }),
  join: t.procedure
    .input(z.object({ code: z.string(), playerName: z.string() }))
    .mutation(async () => {
      return {};
    }),
  start: t.procedure
    .input(z.object({ code: z.string() }))
    .mutation(async () => {
      return {};
    }),
  nextScene: t.procedure
    .input(z.object({ code: z.string() }))
    .mutation(async () => {
      return {};
    }),
  submitAnswer: t.procedure
    .input(z.object({ code: z.string(), submission: z.string() }))
    .mutation(async () => {
      return {};
    }),
});