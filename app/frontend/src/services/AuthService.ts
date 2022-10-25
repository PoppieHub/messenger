import SignInRequest from "../models/request/SignInRequest";
import SignUpRequest from "../models/request/SignUpRequest";
import ForgotPasswordRequest from "../models/request/ForgotPasswordRequest";
import ForgotPasswordResponse from "../models/response/ForgotPasswordResponse";
import apiClient from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {signIn, signUp, forgotPassword} from "../routes"

export default class AuthService {
    public static async signIn(signInRequest: SignInRequest): Promise<AxiosResponse<AuthResponse>> {
        return apiClient.post<AuthResponse>(signIn(), signInRequest);
    }

    public static async signUp(signUpRequest: SignUpRequest): Promise<AxiosResponse<AuthResponse>> {
        return apiClient.post<AuthResponse>(signUp(), signUpRequest);
    }

    public static async forgotPassword(forgotPasswordRequest: ForgotPasswordRequest): Promise<AxiosResponse<ForgotPasswordResponse>> {
        return apiClient.post<ForgotPasswordResponse>(forgotPassword(), forgotPasswordRequest);
    }
}