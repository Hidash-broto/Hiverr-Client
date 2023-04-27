import { Button, Stack } from '@mui/material';
import { useState } from 'react';

function PaginationPage({ postsPerPage, totalPosts, paginate }: any) {
  console.log(paginate)
  const [buttonId, setButtonId]: any = useState(1)
  let button: any = document.getElementById(buttonId)
  button !== null ? button.style.borderColor = 'black' : button = 0;
  let pageNumbers: any = []
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <Stack direction='row' spacing={3} sx={{ marginLeft: '370px', position: 'absolute', marginTop: '30px' }}>
      {pageNumbers.map((number: any) => {
        return (
          <>
            <Button id={number} onClick={() => {
              paginate(number)
              setButtonId(number)
            }
            } sx={{ width: 25, height: 25, border: 'solid 2px', borderColor: 'primary' }}>{number}</Button>
          </>
        )
      })}
    </Stack>
  )
}

export default PaginationPage