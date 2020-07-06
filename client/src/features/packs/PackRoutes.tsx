import React from "react";
import { Route } from "react-router-dom";

import { PackDiscoverPage } from "features/packs/PackDiscoverPage";
import { PackDetailsPage } from "features/packs/PackDetailsPage";
import { PackNewPage } from "features/packs/PackNewPage";
import { PackCreatorPage } from "features/packs/PackCreatorPage";

export const PackRoutes: React.FC = () => {
  return (
    <>
      <Route exact path="/packs">
        <PackDiscoverPage />
      </Route>
      <Route exact path="/packs/new">
        <PackNewPage />
      </Route>
      <Route exact path="/packs/:packId">
        <PackDetailsPage />
      </Route>
      <Route exact path="/packs/:packId/edit">
        <PackCreatorPage />
      </Route>
    </>
  );
};
