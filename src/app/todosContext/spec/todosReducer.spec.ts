import { TodoList } from "../../types";
import { addTasks, addTodo, removeTodo, moveToEnd, todosListReducer, toggleCompletion } from "../todosReducer";

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
            content: "Second title item",
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
        tasksTodo: []
    },
    {
        title: "Second",
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
            content: "My content",
            isCompleted: false
        }], "First")

        expect(todosListReducer(todoListOneItem, addOneTask)).toEqual([{
            title: "First",
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
                tasksTodo: []
            },
            {
                title: "Second",
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
                tasksTodo: []
            },
            {
                title: "Second",
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
                tasksTodo: []
            },
            {
                title: "First",
                tasksTodo: []
            },
        ])
    })

    it("Should toggle todo task completion", () => {
        const actionMove = toggleCompletion({taskTitle: "Second sub", todoTitle: "Second"})

        expect(todosListReducer(todoListTwoItems, actionMove)).toEqual([
            {
                title: "First",
                tasksTodo: []
            },
            {
                title: "Second",
                tasksTodo: [{
                    content: "Second title item",
                    isCompleted: true,
                    title: "Second sub"
                }]
            },
        
        ])

    })

})
