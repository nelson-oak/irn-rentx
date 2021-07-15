import React, { useState, useEffect } from 'react'

import { api } from '../../services/api'
import { ICarDTO } from '../../dtos/ICarDTO'

import {
  Container,
} from './styles'

export function MyCars() {
  const [car, setCars] = useState<ICarDTO[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true)
        const response = await api.get('/schedules_byuser?user_id=1')
        setCars(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCars()
  }, [])

  return (
    <Container>

    </Container>
  )
}