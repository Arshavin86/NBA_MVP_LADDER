
import style from 'styled-components';
import Table_body from '../components/Table_body';


const Table_main = style.table`
    overflow-x: auto;
    border-collapse: separate;
    color: #333;
    font-family: Roboto,sans-serif;
    font-size: 14px;
    line-height: 16px;
    margin: 0;
    width: 100%;
    border-top: 2px solid #9b9b9b;
`;

const Table_head = style.thead`
    overflow-x: auto;
    border-collapse: separate;
    color: #333;
    font-family: Roboto,sans-serif;
    font-size: 14px;
    line-height: 16px;
    margin: 0;
    width: 100%;
`;

const Table = props => {

    return (
        <Table_main>
            <Table_head>
                <tr>
                    <th></th>
                    <th>Team</th>
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
            </Table_head>
            <Table_body/>
        </Table_main>
    )
    
}

export default Table;

