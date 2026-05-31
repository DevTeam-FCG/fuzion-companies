import { Router, type IRouter } from "express";
import { db, portfolioCompaniesTable } from "@workspace/db";
import { ListPortfolioCompaniesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/portfolio-companies", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(portfolioCompaniesTable)
    .orderBy(portfolioCompaniesTable.sort_order);
  res.json(ListPortfolioCompaniesResponse.parse(rows));
});

export default router;
