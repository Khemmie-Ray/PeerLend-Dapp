import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UseFetchRequests from "../Hooks/UseFetchRequests";

const RequestsTable = () => {
  const allRequests = UseFetchRequests()

    return (
      <div className="my-12">
     <TableContainer component={Paper} style={{ backgroundColor: '#14112D', padding: "10px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableHead>
              <TableRow>
                <TableCell style={{ color: 'white' }}>Id</TableCell>
                <TableCell style={{ color: 'white' }} align="right">Loan Request</TableCell>
                <TableCell style={{ color: 'white' }} align="right">Author</TableCell>
                <TableCell style={{ color: 'white' }} align="right">Lender</TableCell>
                <TableCell style={{ color: 'white' }} align="right">Amount</TableCell>
                <TableCell style={{ color: 'white' }} align="right">Rate</TableCell>
                <TableCell style={{ color: 'white' }} align="right">Repayment</TableCell>
                <TableCell style={{ color: 'white' }} align="right">Return date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allRequests.map((info) => (
                <TableRow
                  key={info.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell style={{ color: 'white' }}>{Number(info.id)}</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">{info.loanReq}</TableCell>
                  <TableCell style={{ color: 'white', overflow: 'hidden'}} align="right" className="overflow-x-clip">{info.address}</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">{info.lender}</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">{Number(info.amount)}</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">{Number(info.interest)}</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">{Number(info.repayment)}</TableCell>
                  <TableCell style={{ color: 'white' }} align="right">{Number(info.rDate)}</TableCell>
                  {/* <TableCell style={{ color: 'white' }} align="right">{Number(info.loanStatus)}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
     </div>
    )
  }
  
  export default RequestsTable