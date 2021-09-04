import { GroupData, RestManager } from '..';
import { Endpoints, ModelBases } from '../Endpoints';
import { KnightHacksAPIError } from '../KnightHacksAPIError';
import { BaseManager } from './base';

export class Group implements GroupData {
  readonly categories: string[];
  readonly icon: string;
  readonly members: string[];
  readonly name: string;

  constructor(readonly rest: RestManager, data: GroupData) {
    this.categories = data.categories;
    this.icon = data.icon;
    this.members = data.members;
    this.name = data.name;
  }

  /**
   * Adds a new member.
   * @param memberName The member to add.
   */
  async addMember(memberName: string): Promise<void> {
    await this.rest.performRequest(
      Endpoints.groupMember(this.name, memberName),
      {
        method: 'put',
      }
    );

    // Add members cache to this instance.
    this.members.push(memberName);
  }
}

export class GroupManager extends BaseManager {
  /**
   * Creates a new group.
   * @param group The data to create a group.
   */
  async create(group: GroupData): Promise<void> {
    await this.rest.performRequest(ModelBases.group, {
      method: 'post',
      body: JSON.stringify(group),
    });
  }

  /**
   * Looks up a specific group.
   * @param name The name of the group to get.
   * @returns The found group or undefined if not found.
   */
  async get(name: string): Promise<GroupData | undefined> {
    const response = (await this.rest
      .performRequest(Endpoints.specificGroup(name))
      .catch((e: KnightHacksAPIError) => {
        if (e.code === 404) {
          return undefined;
        }

        throw e;
      })) as GroupData;

    return response;
  }

  /**
   * Update the given group.
   * @param groupName The group name to update.
   * @param data The data to update the group with.
   */
  async update(groupName: string, data: GroupData): Promise<void> {
    await this.rest.performRequest(Endpoints.specificGroup(groupName), {
      method: 'put',
      body: JSON.stringify(data),
    });
  }
}
