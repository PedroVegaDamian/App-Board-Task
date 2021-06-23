import store from '@/store'
import { getCurrentUser } from './auth'
import { firebaseFirestore } from '@/.firebase'

export const firestoreCreateBoard = async title => {
  try {
    const newBoardRef = firebaseFirestore.collection('boards').doc()
    const { uid: userId } = getCurrentUser()
    const { id } = newBoardRef
    await newBoardRef.set({ id, userId, title })
    console.log('Nuevo Tablero Creado')
  } catch (error) {
    console.error(error.code, error.message)
  }
}

export const firestoreCreateList = async (title, idBoard) => {
  try {
    const newListRef = firebaseFirestore.collection('lists').doc()
    const { uid: userId } = getCurrentUser()
    const { id } = newListRef
    await newListRef.set({ id, userId, idBoard, title })
    console.log('Nueva Lista Creada')
  } catch (error) {
    console.error(error.code, error.message)
  }
}

export const firestoreCreateTask = async (title, idList) => {
  try {
    const newTaskRef = firebaseFirestore.collection('tasks').doc()
    const { uid: userId } = getCurrentUser()
    const { id } = newTaskRef
    await newTaskRef.set({ id, userId, idList, title })
    console.log('Nueva Tarea Creada')
  } catch (error) {
    console.error(error.code, error.message)
  }
}

export const firestoreDeleteBoard = async idBoard => {
  try {
    const lists = store.getters.getLists
    const listFilterByBoard = lists.filter(list => list.idBoard === idBoard)
    await listFilterByBoard.forEach(async list => {
      await firestoreDeleteList(list.id)
    })

    await firebaseFirestore
      .collection('boards')
      .doc(idBoard)
      .delete()
    console.log('Tablero Eliminado')
  } catch (error) {
    console.error(error.code, error.message)
  }
}

export const firestoreDeleteList = async idList => {
  try {
    const tasks = store.getters.getTasks
    const taskFilterByList = tasks.filter(task => task.idList === idList)
    await taskFilterByList.forEach(async task => {
      await firestoreDeleteTask(task.id)
    })

    await firebaseFirestore
      .collection('lists')
      .doc(idList)
      .delete()
    console.log('Lista Eliminada')
  } catch (error) {
    console.error(error.code, error.message)
  }
}

export const firestoreDeleteTask = async idTask => {
  try {
    await firebaseFirestore
      .collection('tasks')
      .doc(idTask)
      .delete()
    console.log('Tarea Eliminada')
  } catch (error) {
    console.error(error.code, error.message)
  }
}
