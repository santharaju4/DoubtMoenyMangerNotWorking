// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionOptionId: transactionTypeOptions[0].optionId,
    transactionsList: [],
    titleInput: '',
    amountInput: '',
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionList = transactionsList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({
      transactionsList: updatedTransactionList,
    })
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      transactionOptionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTypeInput = event => {
    this.setState({transactionOptionId: event.target.value})
  }

  expensesAmount = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  incomeAmount = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  balanceAmount = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {
      transactionOptionId,
      titleInput,
      amountInput,
      transactionsList,
    } = this.state
    console.log(transactionOptionId)

    return (
      <div className="app-container">
        <div className="card-container">
          <div className="header-container">
            <h1 className="heading">Hi, Richard</h1>
            <p className="description">
              Welcome back to your
              <span className="span-text"> Money Manager</span>
            </p>
          </div>
          <ul>
            <MoneyDetails
              balanceAmount={this.balanceAmount()}
              incomeAmount={this.incomeAmount()}
              expensesAmount={this.expensesAmount()}
            />
          </ul>
          <div className="transaction-details">
            <form className="transaction-form" onSubmit={this.onSubmitForm}>
              <h1 className="transaction-header">Add Transaction</h1>
              <label htmlFor="input" className="input-label">
                Title
              </label>
              <input
                type="text"
                id="input"
                className="input"
                value={titleInput}
                placeholder="TITLE"
                onChange={this.onChangeTitleInput}
              />
              <label htmlFor="amount" className="input-label">
                AMOUNT
              </label>
              <input
                type="amount"
                id="amount"
                className="input"
                value={amountInput}
                placeholder="AMOUNT"
                onChange={this.onChangeAmountInput}
              />
              <label htmlFor="select" className="input-label">
                TYPE
              </label>
              <select
                className="input"
                id="select"
                value={transactionOptionId}
                onChange={this.onChangeTypeInput}
              >
                {transactionTypeOptions.map(eachTransaction => (
                  <option
                    key={eachTransaction.optionId}
                    value={eachTransaction.optionId}
                  >
                    {eachTransaction.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <div className="history-transactions">
              <h1 className="transaction-header">History</h1>
              <div className="transactions-table-container">
                <ul className="transactions-table">
                  <li className="table-header">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                  </li>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
