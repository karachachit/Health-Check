import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import DG from '2gis-maps'
import LocationIcon from '../assets/icons/location1.svg'
import CompanyIcon from '../assets/icons/logo1.svg'

const Map = () => {
   useEffect(() => {
      const map = DG.map('map-container', {
         center: [42.874722, 74.612222],
         zoom: 12,
      })

      const customIcon = DG.icon({
         iconUrl: LocationIcon,
         iconAnchor: [40, 40],
      })
      const locationMarker = DG.marker([42.905922, 74.590922], {
         icon: customIcon,
      })

      const companyIcon = DG.icon({
         iconUrl: CompanyIcon,
         iconAnchor: [32, 5],
      })
      const companyMarker = DG.marker([42.905922, 74.590922], {
         icon: companyIcon,
      })

      locationMarker.addTo(map)
      companyMarker.addTo(map)

      return () => map && map.remove()
   }, [])

   return <StyledMapContainer id="map-container" />
}

export default Map

const StyledMapContainer = styled('div')(() => ({
   width: '100%',
   height: '400px',
}))
