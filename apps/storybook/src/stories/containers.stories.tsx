import { Container } from "@init/ui/container";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Containers",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Containers: Story = {
  render: () => (
    <div className="relative box-border flex max-w-full flex-col flex-wrap gap-5 border-4 border-black p-10">
      <span className="absolute left-10 top-[-12px] bg-white px-2 text-black">
        Containers
      </span>

      <Container variant="normal" heading="Container.is-centered" centered>
        Good morning. Thou hast had a good night's sleep, I hope.
      </Container>

      <Container variant="dark" heading="Container.is-dark">
        Good morning. Thou hast had a good night's sleep, I hope.
      </Container>

      <Container variant="normal" rounded>
        Good morning. Thou hast had a good night's sleep, I hope.
      </Container>

      <Container variant="dark" rounded>
        Good morning. Thou hast had a good night's sleep, I hope.
      </Container>
    </div>
  ),
};