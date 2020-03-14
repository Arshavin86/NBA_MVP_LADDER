import { useContext } from 'react'
import style from 'styled-components'
import ApiContext from '../Context'

const Body = style.tbody`
    overflow-x: auto;
    border-collapse: separate;
    color: #333;
    font-family: Roboto,sans-serif;
    font-size: 14px;
    line-height: 16px;
    margin: 0;
    width: 100%;
`

const Tr = style.tr`
    background-color: #f1f1f1;
`

const Td = style.td`
    padding: 12px;
    white-space: nowrap;
    font-size: 12px;
`

const Th = style.th`
    color: #0B5BE1;
    cursor: pointer;
`

const TableBody = () => {
  const [players] = useContext(ApiContext)
  const playersList = players => {
    const context = []
    players.map(player => {
      const { position, firstname, lastname, pos } = player

      if (position % 2 === 0) {
        context.push(
          <Tr key={position}>
            <th>{position}</th>
            <Th>{firstname} {lastname}</Th>
            <Td>{pos}</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
          </Tr>
        )
      } else {
        context.push(
          <tr key={position}>
            <th>{position}</th>
            <Th>{firstname} {lastname}</Th>
            <Td>{pos}</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
            <Td>N/A</Td>
          </tr>
        )
      }
    })
    return context
  }

  return (
    <Body>
      {playersList(players)}
    </Body>
  )
}

export default TableBody
