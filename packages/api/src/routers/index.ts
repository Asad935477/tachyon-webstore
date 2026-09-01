import { protectedProcedure, publicProcedure, router } from "../index";
import { catalogRouter } from "./catalog";
import { checkoutRouter } from "./checkout";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: "This is private",
			user: ctx.session.user,
		};
	}),
	catalog: catalogRouter,
	checkout: checkoutRouter,
});
export type AppRouter = typeof appRouter;
