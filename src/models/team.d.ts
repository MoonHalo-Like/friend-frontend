/**
 * 队伍类别
 */
import {UserType} from "./user";

export type  TeamType = {
    id: number;
    name: string;
    avatarUrl: string;
    description: string;
    expireTime?: Date;
    maxNum: number;
    password?: string;
    joinUserNum: number;
    userId: number;
    status: number;
    createTime: Date;
    updateTime: Date;
    userVOList?: UserType[]
}