// import mongoose from "mongoose";
// import { config } from "./config";
// import { ping, setupDB } from "./db";
// import buildServer from "./utils/server";

// async function main() {
//     // const { db, client } = await setupDB();



//     // try {
//     //     await ping(client);
//     //     // logger.info('Database connected');
//     // } catch (error) {
//     //     // logger.error(error,'ping failed!');
//     //     process.exit(1);
//     // }

//     const server = await buildServer();

//     server.listen(config.PORT, () =>
//         console.log(`API running on http://localhost:${config.PORT}`),
//     );
// }

// main();

class Vehicle {
    constructor(public make: string) { }
}

type Constructor<T = {}> = new (...args: any[]) => T;

function Flyable<T extends Constructor<Vehicle>>(Base: T) {
    return class extends Base {
        fly() {
            console.log(`${this.make} is flying!`);
        }
    }
}

function Swimmabled<T extends Constructor<Vehicle>>(Base: T) {
    return class extends Base {
        swim() {
            console.log(`${this.make} is swimming!`);
        }
    }
}

class AmphibiousPlane extends Swimmabled(Flyable(Vehicle)) {
    takeOff() {
        console.log(`${this.make} is taking off!`);
    }
}

const plane = new AmphibiousPlane("Hydrojet");

plane.takeOff();
plane.swim();
plane.fly();

interface ITaskRepository {
    findTasks: () => Promise<void>
}

interface IProjectRepository {
    findProjects: () => Promise<void>
}

class BaseRepository {
    protected defaultLimit = 10;
    protected defaultOffset = 0;
    protected client: string;

    constructor() {
        this.client = 'Client';
    }

    getClient() {
        return this.client;
    }
}

function ProjectRepository<T extends Constructor<BaseRepository>>(Base: T) {
    return class ProjectRepositoryMixin extends Base implements IProjectRepository {
        async findProjects() {
            console.log('Find Project')
        }
    }
}


function TaskRepository<T extends Constructor<BaseRepository>>(Base: T) {
    return class TaskRepositoryMixin extends Base implements ITaskRepository {
        async findTasks() {
            console.log('Find Task')
        }
    }
}

const repository = new (ProjectRepository(TaskRepository(BaseRepository)))();