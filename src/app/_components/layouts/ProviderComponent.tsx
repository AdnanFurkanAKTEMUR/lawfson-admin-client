"use client";

import React, { ReactNode, Suspense } from "react";
import { Provider } from "react-redux";
import Loading from "@/app/_components/layouts/Loading";
import store from "../../../../store";

interface IProps {
  children?: ReactNode;
}

const ProviderComponent = ({ children }: IProps) => {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <>{children} </>
      </Suspense>
    </Provider>
  );
};

export default ProviderComponent;
// todo
// export default appWithI18Next(ProviderComponent, ni18nConfig);
