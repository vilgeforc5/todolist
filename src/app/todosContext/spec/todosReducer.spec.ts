import { TodoList } from "../../types";
import { addTasks, addTodo, editTodo, removeTodo, moveToEnd, todosListReducer } from "../todosReducer";

import { describe, it, expect } from "vitest";

const todoListOneItem: TodoList = [
    {
        title: "First",
        isCompleted: false,
        tasksTodo: []
    },
]

const todoListTwoItems: TodoList = [
    {
        title: "First",
        isCompleted: false,
        tasksTodo: []
    },
    {
        title: "Second",
        isCompleted: true,
        tasksTodo: [{
            content: "Second title item",
            isCompleted: false,
            title: "Second sub"
        }]
    },

]

const todoListManyItems: TodoList = [
    {
        title: "First",
        isCompleted: false,
        tasksTodo: []
    },
    {
        title: "Second",
        isCompleted: true,
        tasksTodo: [
            {
                content: "Second title item",
                isCompleted: false,
                title: "Second sub"
            },
            {
                content: "another sub title",
                isCompleted: true,
                title: "Another sub"
            },
        ]
    },
]

const todoListTooManyItems: TodoList = [
    {
        title: "First",
        isCompleted: false,
        tasksTodo: []
    },
    {
        title: "Second",
        isCompleted: true,
        tasksTodo: [
            {
                content: "Second title item",
                isCompleted: false,
                title: "Second sub"
            },
            {
                content: "another sub title",
                isCompleted: true,
                title: "Another sub"
            },
        ]
    },
    {
        title: "Third",
        isCompleted: true,
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
                isCompleted: false,
                tasksTodo: []
            },
        ])
    })

    it("Should add todo", () => {
        const actionAddItem = addTodo({
            title: "Added",
            isCompleted: false,
            tasksTodo: []
        })

        expect(todosListReducer(todoListOneItem, actionAddItem)).toEqual([
            {
                title: "First",
                isCompleted: false,
                tasksTodo: []
            },
            {
                title: "Added",
                isCompleted: false,
                tasksTodo: []
            }
        ])
    })

    it("Should edit todo", () => {
        const actionEditTodoTitle = editTodo({
            title: "New title"
        }, "First")

        expect(todosListReducer(todoListOneItem, actionEditTodoTitle)).toEqual([{
            title: "New title",
            isCompleted: false,
            tasksTodo: []
        }])

        const actionEditTodoCompleted = editTodo({
            isCompleted: false,
            tasksTodo: [{
                title: "Second sub",
                content: "Second title item modified"
            }]
        }, "Second")

        expect(todosListReducer(todoListTwoItems, actionEditTodoCompleted)).toEqual([
            {
                title: "First",
                isCompleted: false,
                tasksTodo: []
            },
            {
                title: "Second",
                isCompleted: false,
                tasksTodo: [{
                    content: "Second title item modified",
                    isCompleted: false,
                    title: "Second sub"
                }]
            }])

        const actionEditAllMany = editTodo({
            isCompleted: false,
            title: "Totally new title",
            tasksTodo: [
                {
                    title: "Second sub",
                    content: "Modified content",
                    isCompleted: true,

                },
                {
                    title: "Another sub",
                    content: "Modified another sub",
                    isCompleted: false,
                }
            ]
        }, "Second")

        expect(todosListReducer(todoListManyItems, actionEditAllMany)).toEqual([
            {
                title: "First",
                isCompleted: false,
                tasksTodo: []
            },
            {
                title: "Totally new title",
                isCompleted: false,
                tasksTodo: [
                    {
                        content: "Modified content",
                        isCompleted: true,
                        title: "Second sub"
                    },
                    {
                        content: "Modified another sub",
                        isCompleted: false,
                        title: "Another sub"
                    },
                ]
            },
        ])
    })

    it("Should add todo task", () => {
        const addOneTask = addTasks([{
            title: "My task",
            content: "My content",
            isCompleted: false
        }], "First")

        expect(todosListReducer(todoListOneItem, addOneTask)).toEqual([{
            title: "First",
            isCompleted: false,
            tasksTodo: [{
                title: "My task",
                content: "My content",
                isCompleted: false
            }]
        },
        ])

        const addOneTaskSecondKey = addTasks([{
            title: "My task",
            content: "My content",
            isCompleted: false
        }], "Second")

        expect(todosListReducer(todoListManyItems, addOneTaskSecondKey)).toEqual([
            {
                title: "First",
                isCompleted: false,
                tasksTodo: []
            },
            {
                title: "Second",
                isCompleted: true,
                tasksTodo: [
                    {
                        content: "Second title item",
                        isCompleted: false,
                        title: "Second sub"
                    },
                    {
                        content: "another sub title",
                        isCompleted: true,
                        title: "Another sub"
                    },
                    {

                        title: "My task",
                        content: "My content",
                        isCompleted: false
                    }
                ]
            },
        ])

        const addOneTaskOverwrite = addTasks([{
            title: "Another sub",
            content: "another sub title added",
            isCompleted: false
        }], "Second")

        expect(todosListReducer(todoListManyItems, addOneTaskOverwrite)).toEqual([
            {
                title: "First",
                isCompleted: false,
                tasksTodo: []
            },
            {
                title: "Second",
                isCompleted: true,
                tasksTodo: [
                    {
                        content: "Second title item",
                        isCompleted: false,
                        title: "Second sub"
                    },
                    {
                        title: "Another sub",
                        content: "another sub title added",
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
                isCompleted: true,
                tasksTodo: [
                    {
                        content: "Second title item",
                        isCompleted: false,
                        title: "Second sub"
                    },
                    {
                        content: "another sub title",
                        isCompleted: true,
                        title: "Another sub"
                    },
                ]
            },
            {
                title: "Third",
                isCompleted: true,
                tasksTodo: []
            },
            {
                title: "First",
                isCompleted: false,
                tasksTodo: []
            },
        ])
    })
})
