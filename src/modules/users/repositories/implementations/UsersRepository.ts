import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    console.log(id);
    console.log(this.users);
    console.log(id);
    const foundUser = this.users.find((user) => user.id === id);

    return foundUser;
  }

  findByEmail(email: string): User | undefined {
    const foundUser = this.users.find((user) => user.email === email);

    return foundUser;
  }

  turnAdmin(receivedUser: User): User {
    const isUserAdmin = this.users.find((user) => user.id === receivedUser.id);

    if (!isUserAdmin.admin) {
      isUserAdmin.admin = true;
    }

    return isUserAdmin;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
