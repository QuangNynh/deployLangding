import { create } from "zustand";
import { devtools } from "zustand/middleware";
const useCommon = create(
  devtools(
    (set) => ({
      isLoading: false,
      isRefresh: false,
      setIsLoading: (value) =>
        set(
          {
            isLoading: value,
          },
          false,
          "common/setIsLoading"
        ),
      setIsRefresh: (value) =>
        set(
          {
            isRefresh: value,
          },
          false,
          "common/setIsRefresh"
        ),
    }),

    {
      enabled: true,
      name: "common",
    }
  )
);

export default useCommon;
