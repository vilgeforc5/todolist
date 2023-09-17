import { TodoList } from "../../types";
import { addTasks, addTodo, removeTodo, moveToEnd, todosListReducer, toggleCompletion, editTodo, removeTask } from "../todosReducer";

import { describe, it, expect } from "vitest";

const todoListOneItem: TodoList = [
    {
        title: "First",
        tasksTodo: []
    },
]

const todoListTwoItems: TodoList = [
    {
        title: "First",
        tasksTodo: []
    },
    {
        title: "Second",
        tasksTodo: [{
            isCompleted: false,
            title: "Second sub"
        }]
    },

]

const todoListManyItems: TodoList = [
    {
        title: "First",
        tasksTodo: []
    },
    {
        title: "Second",
        tasksTodo: [
            {
                isCompleted: false,
                title: "Second sub"
            },
            {
                isCompleted: true,
                title: "Another sub"
            },
        ]
    },
]

const todoListTooManyItems: TodoList = [
    {
        title: "First",
        tasksTodo: []
    },
    {
        title: "Second",
        tasksTodo: [
            {
                isCompleted: false,
                title: "Second sub"
            },
            {
                isCompleted: true,
                title: "Another sub"
            },
        ]
    },
    {
        title: "Third",
        tasksTodo: []
    },
]


describe("Todos List reducer function", () => {

    it("Should remove todo", () => {
        const actionRemoveFirst = removeTodo("First")
        const actionRemoveSecond = removeTodo("Second")

        expect(todosListReducer(todoListOneItem, actionRemoveFirst)).toEqual([])
        expect(todosListReducer(todoListTwoItems, actionRemoveSecond)).toEqual([
            {
                title: "First",
                tasksTodo: []
            },
        ])
    })

    it("Should add todo", () => {
        const actionAddItem = addTodo({
            title: "Added",
            tasksTodo: []
        })

        expect(todosListReducer(todoListOneItem, actionAddItem)).toEqual([
            {
                title: "First",
                tasksTodo: []
            },
            {
                title: "Added",
                tasksTodo: []
            }
        ])
    })

    it("Should add todo task", () => {
        const addOneTask = addTasks([{
            title: "My task",
            isCompleted: false
        }], "First")

        expect(todosListReducer(todoListOneItem, addOneTask)).toEqual([{
            title: "First",
            tasksTodo: [{
                title: "My task",
                isCompleted: false
            }]
        },
        ])

        const addOneTaskSecondKey = addTasks([{
            title: "My task",
            isCompleted: false
        }], "Second")

        expect(todosListReducer(todoListManyItems, addOneTaskSecondKey)).toEqual([
            {
                title: "First",
                tasksTodo: []
            },
            {
                title: "Second",
                tasksTodo: [
                    {
                        isCompleted: false,
                        title: "Second sub"
                    },
                    {
                        isCompleted: true,
                        title: "Another sub"
                    },
                    {

                        title: "My task",
                        isCompleted: false
                    }
                ]
            },
        ])

        const addOneTaskOverwrite = addTasks([{
            title: "Another sub",
            isCompleted: false
        }], "Second")

        expect(todosListReducer(todoListManyItems, addOneTaskOverwrite)).toEqual([
            {
                title: "First",
                tasksTodo: []
            },
            {
                title: "Second",
                tasksTodo: [
                    {
                        isCompleted: false,
                        title: "Second sub"
                    },
                    {
                        title: "Another sub",
                        isCompleted: false
                    }
                ]
            },
        ])

    })

    it("Should move item to end", () => {
        const actionMove = moveToEnd("First")
        expect(todosListReducer(todoListOneItem, actionMove)).toEqual(todoListOneItem)
        expect(todosListReducer(todoListTooManyItems, actionMove)).toEqual([
            {
                title: "Second",
                tasksTodo: [
                    {
                        isCompleted: false,
                        title: "Second sub"
                    },
                    {
                        isCompleted: true,
                        title: "Another sub"
                    },
                ]
            },
            {
                title: "Third",
                tasksTodo: []
            },
            {
                title: "First",
                tasksTodo: []
            },
        ])
    })

    it("Should toggle todo task completion", () => {
        const actionMove = toggleCompletion({ taskTitle: "Second sub", todoTitle: "Second" })

        expect(todosListReducer(todoListTwoItems, actionMove)).toEqual([
            {
                title: "First",
                tasksTodo: []
            },
            {
                title: "Second",
                tasksTodo: [{
                    isCompleted: true,
                    title: "Second sub"
                }]
            },
        ])
    })

    it("Should edit todo item", () => {
        const editAction = editTodo({
            prevTodoTitle: "Second",
            newTitle: "Second new",
            tasksTodo: [{
                title: "Second sub",
                newTitle: "Second sub new",
            }]
        })

        expect(todosListReducer(todoListTwoItems, editAction)).toEqual([
            {
                title: "First",
                tasksTodo: []
            },
            {
                title: "Second new",
                tasksTodo: [{
                    isCompleted: false,
                    title: "Second sub new"
                }]
            },
        ])
    })

    it("Should delete todo tasks", () => {
        const deleteTasks = removeTask({
            todoName: "Second",
            taskDelete: ["Second sub", "Another sub"]
        })
        expect(todosListReducer(todoListManyItems, deleteTasks)).toEqual([
            {
                title: "First",
                tasksTodo: []
            },
            {
                title: "Second",
                tasksTodo: [
                ]
            },
        ])
    })

})
