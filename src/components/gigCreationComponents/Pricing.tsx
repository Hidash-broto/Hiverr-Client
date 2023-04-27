import React from 'react'
import { useDispatch } from 'react-redux'
import Gig from '../../redux/Gig'
import { gigPageChange } from '../../redux/Gig'

function Pricing() {
    const dispatch = useDispatch()
  return (
    <div onClick={() => dispatch(gigPageChange(0))}>
      hello world
    </div>
  )
}

export default Pricing
