import React from 'react'
import { useModal } from '../hooks/useModal'
import Modal from './Modal'
import ContactForm from './ContactForm'
import ModalPortal from './ModalPortal'

const Modals = () => {
    const [isOpenModal1, openModal1, closeModal1] = useModal(false)
    const [isOpenModal2, openModal2, closeModal2] = useModal(false)
    const [isOpenContact, openModalContact, closeModalContact] = useModal(false)
    const [isOpenPortal, openModalPortal, closeModalPortal] = useModal(false)

    return (
        <div>
            <h2>Modales</h2>
            <button onClick={openModal1}>Modal 1</button>
            <Modal isOpen={isOpenModal1} closeModal={closeModal1}>
                <h3>Modal 1</h3>
                <p>Hola este es el contenido de mi modal 1</p>
                <img src="https://placeimg.com/400/400/animals" alt="Animals" />
            </Modal>
            <button onClick={openModal2}>Modal 2</button>
            <Modal isOpen={isOpenModal2} closeModal={closeModal2}>
                <h3>Modal 2</h3>
                <p>Contenido del segundo modal</p>
                <img src="https://placeimg.com/400/400/any" alt="Any" />
            </Modal>
            <button onClick={openModalContact}>Modal Contacto</button>
            <Modal isOpen={isOpenContact} closeModal={closeModalContact}>
                <ContactForm />
            </Modal>
            <button onClick={openModalPortal}>Modal en Portal</button>
            <ModalPortal isOpen={isOpenPortal} closeModal={closeModalPortal}>
                <h3>Modal 2</h3>
                <p>Contenido de un modal que carga en otro nodo del DOM diferente a dónde carga neustra app de React gracias a un React Portal.🌌⚛️</p>
                <img src="https://placeimg.com/400/400/tech" alt="Tecnology" />
            </ModalPortal>
        </div>
    )
}

export default Modals