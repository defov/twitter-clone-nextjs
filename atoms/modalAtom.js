import { atom } from 'recoil'

export const modalOpenState = atom({
    key: 'modalOpenState',
    default: false
})

export const singlePostState = atom({
    key: 'singlePostState',
    default: null
})