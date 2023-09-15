import "dotenv/config";
import UsersRepository from "@/api/v1/users/users.repository";
import UserProfileDTO from "@/api/v1/users/dtos/userProfile.dto";

class UsersService {
  getProfile = async (id: string) => {
    try {
      const user = await UsersRepository.getUserById(id);

      if (!user) {
        throw new Error();
      }

      const { username, email } = user;

      const userProfile: UserProfileDTO = {
        username,
        email,
      };

      return userProfile;
    } catch (error) {
      throw error;
    }
  };
}

export default new UsersService();
