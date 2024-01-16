import { useState } from 'react'

const useModal = () => {
   const [modalType, setModalType] = useState(null)
   const [showModal, setShowModal] = useState(false)

   const openModal = (type) => {
      setModalType(type)
      setShowModal(true)
   }

   const closeModal = () => {
      setShowModal(false)
   }

   return { modalType, showModal, openModal, closeModal }
}

export default useModal
