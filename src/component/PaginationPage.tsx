import { Button, Stack } from '@mui/material';

function PaginationPage({ postsPerPage, totalPosts, paginate}:any) {
  console.log(paginate)
    let pageNumbers: any = []
    for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pageNumbers.push(i)
    }
  return (
    <Stack direction='row' spacing={4}>
      {pageNumbers.map((number:number) => {
        return(
              <Button onClick={() => paginate(number)} sx={{width:25, height:25, border:'solid', borderColor:'primary'}}>{number}</Button>
        )
      })}
    </Stack>
  )
}

export default PaginationPage