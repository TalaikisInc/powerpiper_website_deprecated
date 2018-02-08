import { Component } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const data = [
  { name: '1 Bitcoin transaction', kWh: 577, amt: 1100 },
  { name: '100,000 VISA transactions', kWh: 169, amt: 1100 }
]

export default class TxCosts extends Component {
  render () {
    return (
      <ResponsiveContainer width={600} height={300}>
        <BarChart data={data} margin={{top: 5, right: 100, left: 20, bottom: 5}}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="kWh" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}
