import { Component } from 'react'
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const data = [
    { name: 'Hungary', TWh: 38.6, amt: 2400 },
    { name: 'N.Zealand', TWh: 39.9, amt: 2400 },
    { name: 'Peru', TWh: 42.9, amt: 2400 },
    { name: 'Hong Kong', TWh: 44, amt: 2400 },
    { name: 'Bitcoin', TWh: 47.65, amt: 2400 }
]

export default class TxCosts extends Component {
  render () {
    return (
      <ResponsiveContainer width={600} height={300}>
        <BarChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="TWh" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}
