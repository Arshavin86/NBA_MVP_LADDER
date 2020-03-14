import style from 'styled-components'
import TableBody from './Table_body'

const TableMain = style.table`
    overflow-x: auto;
    border-collapse: separate;
    color: #333;
    font-family: Roboto,sans-serif;
    font-size: 14px;
    line-height: 16px;
    margin: 0;
    width: 100%;
    border-top: 2px solid #9b9b9b;
    border-bottom: 1px solid #e6e8ea;
`

const TableHead = style.thead`
    overflow-x: auto;
    border-collapse: separate;
    color: #333;
    font-family: Roboto,sans-serif;
    font-size: 14px;
    line-height: 16px;
    margin: 0;
    width: 100%;
`

const Table = () => {
  return (
    <TableMain>
      <TableHead>
        <tr>
          <th>Rk</th>
          <th />
          <th>Pos</th>
          <th>G</th>
          <th>MP</th>
          <th>FG%</th>
          <th>TRB</th>
          <th>AST</th>
          <th>STL</th>
          <th>BLK</th>
          <th>TOV</th>
          <th>PTS</th>
        </tr>
      </TableHead>
      <TableBody />
    </TableMain>
  )
}

export default Table
