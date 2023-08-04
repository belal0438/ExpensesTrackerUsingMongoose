
const Expenses = require('../models/expense');
const User = require('../models/users');

exports.postExpensesData = async (req, res) => {
    try {
        const { amount, decription, category } = req.body;
        const expense = new Expenses({ amount, decription, category, userId: req.user })
        await expense.save();
        res.status(201).json({ message: 'succesfully Added' });
    } catch (error) {
        console.log(error)
    }
}



exports.DeleteExpensesData = async (req, res) => {
    try {
        // console.log(req.params.id);
        const ExpensesId = req.params.id
        await Expenses.findByIdAndRemove(ExpensesId);
        res.status(200).json({ data: 'data hase deleted succesfull' });
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            error: error
        })
    }
}



exports.GetExpensesData = async (req, res) => {
    try {
        // console.log(req.user._id)
        const expenses = await Expenses.find({ userId: req.user._id }).select('amount category decription _id')
        // console.log("getexpensesData>>>>>",expenses.length)
        return res.status(201).json(expenses)
    } catch (error) {
        // console.log(error)
        return res.status(500).json({
            error: error
        })
    }
}


exports.GetUserData = async (req, res) => {
    try {
        UserData = await User.find({ _id: req.user._id }, { _id: 0, name: 1, phone: 1, gendder: 1, ispremiumuser: 1 });
        // console.log(UserData);
        return res.status(201).json(UserData)
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }

}




exports.PaginationData = async (req, res) => {
    try {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 3;

        let totalExpense = (await Expenses.find({ userId: req.user._id })).length;
        // console.log(totalExpense)

        let skip = (page - 1) * limit;

        let ExpensesData = await Expenses.find({ userId: req.user._id },{_id:0, userId:0}).sort({ amount: 1 }).skip(skip).limit(limit);
        //   console.log(ExpensesData);

        res.status(200).json({
            allExpense: ExpensesData,
            currentPage: page,
            hasNextPage: limit * page < totalExpense,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalExpense / limit)
        })


    } catch (error) {
        res.status(400).json({ success: false, Error: error.message })
    }
}