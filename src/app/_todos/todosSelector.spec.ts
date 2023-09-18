import { describe, expect, it } from "vitest";
import { TodoList } from "../types";
import { selectCompleted, selectNonCompleted } from "../todoSelectors/todoSelectors";

const sampleTodoList: TodoList = [
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

const secondSampleTodoList: TodoList = [
    {
        title: "First",
        tasksTodo: []
    },
    {
        title: "Second",
        tasksTodo: [
            {
                isCompleted: true,
                title: "Second sub"
            },
            {
                isCompleted: true,
                title: "Another sub"
            },
        ]
    },
]

describe("Should correctly select todo", () => {
    it("Should correctly select completed", () => {
        expect(selectCompleted(sampleTodoList)).toEqual([
            {
                title: "First",
                tasksTodo: []
            },
        ])
        expect(selectCompleted(secondSampleTodoList)).toEqual([
            {
                title: "First",
                tasksTodo: []
            },
            {
                title: "Second",
                tasksTodo: [
                    {
                        isCompleted: true,
                        title: "Second sub"
                    },
                    {
                        isCompleted: true,
                        title: "Another sub"
                    },
                ]
            },
        ])
    })

    it("Should correctly select non-completed", () => {
        expect(selectNonCompleted(sampleTodoList)).toEqual([
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
                ])
        expect(selectNonCompleted(secondSampleTodoList)).toEqual([
        ])
    })
})