const asyncHandler = require("../../utils/async-handler");
const expenseService = require("./expense.service");

const create = asyncHandler(async (req, res) => {
  const expense = await expenseService.createExpense(req.body);

  res.status(201).json({
    success: true,
    message: "Expense added successfully.",
    data: { expense },
  });
});

const getAll = asyncHandler(async (req, res) => {
  const expenses = await expenseService.getExpenses(req.query);

  res.json({
    success: true,
    total: expenses.length,
    data: { expenses },
  });
});

module.exports = {
  create,
  getAll,
};