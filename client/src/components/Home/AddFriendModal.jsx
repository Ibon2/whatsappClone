import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/modal'
import { Button, ModalOverlay } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import TextField from '../TextField'
import * as Yup from 'yup';

const friendSchema = Yup.object({
  friendName: Yup.string()
    .required('Username required')
    .min(6, 'Invalid username!')
    .max(28, 'Invalid username!'),
});
const AddFriendModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent >
        <ModalHeader>Add a Friend!</ModalHeader>
        <ModalCloseButton />
        <Formik initialValues={{ friendName: "" }}
          onSubmit={values => {
            onClose();
          }}
          validationSchema={friendSchema}
        >
          <Form>
            <ModalBody>
              <TextField
                label="Enter friend's name"
                placeholder="Enter friend's username..."
                autoComplete="off"
                name="friendName"
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' type="submit">
                Submit
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>

  )
}

export default AddFriendModal  