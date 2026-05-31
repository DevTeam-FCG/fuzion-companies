import { Router, type IRouter } from "express";
import healthRouter from "./health";
import portfolioRouter from "./portfolio";
import functionsRouter from "./functions";

const router: IRouter = Router();

router.use(healthRouter);
router.use(portfolioRouter);
router.use(functionsRouter);

export default router;
