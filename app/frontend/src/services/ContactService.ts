import apiClient from "../http";
import {AxiosResponse} from 'axios';
import {acceptContact, addContact, deleteContact, getContacts} from "../routes"
import {ContactListResponse} from "../models/response/ContactListResponse";
import {ContactListItem} from "../models/response/ContactListItem";
import {DeleteContactResponse} from "../models/response/Other/DeleteContactResponse";

export default class ContactService {
    public static async getContacts(): Promise<AxiosResponse<ContactListResponse>> {
        return apiClient.get<ContactListResponse>(getContacts());
    }

    public static async addContact(otherUserId: string): Promise<AxiosResponse<ContactListItem>> {
        return apiClient.get<ContactListItem>(addContact(otherUserId));
    }

    public static async acceptContact(contactId: string): Promise<AxiosResponse<ContactListItem>> {
        return apiClient.put<ContactListItem>(acceptContact(contactId));
    }

    public static async deleteContact(contactId: string): Promise<AxiosResponse<DeleteContactResponse>> {
        return apiClient.delete<DeleteContactResponse>(deleteContact(contactId));
    }
}