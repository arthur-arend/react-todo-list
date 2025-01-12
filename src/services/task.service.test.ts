// // task.service.test.ts

// import axios from "axios";
// import { ITask } from "../domain/interfaces/ITask.interface";
// import { getTasks } from "./task.service";

// jest.mock("axios");
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe("task.service - getTasks", () => {
//   it("Deve buscar as tarefas e chamar os Sets", async () => {
//     const mockTasks: ITask[] = [
//       { id: 1, text: "Task Um", completed: false },
//       { id: 2, text: "Task Dois", completed: true },
//     ];

//     mockedAxios.get.mockResolvedValue({ data: mockTasks });

//     const setTasksMock = jest.fn();

//     await getTasks(setTasksMock);

//     expect(mockedAxios.get).toHaveBeenCalledWith(
//       "http://localhost:3000/tasks/"
//     );

//     expect(setTasksMock).toHaveBeenCalledWith(mockTasks);
//   });

//   it("Deve lidar com erros", async () => {
//     mockedAxios.get.mockRejectedValue(new Error("Network error"));
//     const consoleErrorSpy = jest
//       .spyOn(console, "error")
//       .mockImplementation(() => {});

//     const setTasksMock = jest.fn();

//     await getTasks(setTasksMock);

//     expect(setTasksMock).not.toHaveBeenCalled();

//     expect(consoleErrorSpy).toHaveBeenCalledWith(
//       "Erro ao carregar as tarefas:",
//       expect.any(Error)
//     );

//     consoleErrorSpy.mockRestore();
//   });
// });
