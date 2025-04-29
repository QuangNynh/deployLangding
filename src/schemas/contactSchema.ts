import { regexPhoneNumber, specialCharRegexNoNumber } from "@/constants/common";
import { z } from "zod";

export const contactSchemaVi = z.object({
    fullName: z
        .string()
        .trim()
        .min(1, 'Họ và tên không được để trống')
        .max(255, 'Họ và tên không được quá 255 kí tự')
        .regex(specialCharRegexNoNumber, 'Họ và tên không được chứa ký tự số và ký tự đặc biệt'),
    phoneNumber: z
        .string()
        .trim()
        .min(1, 'Số điện thoại không được để trống')
        .regex(regexPhoneNumber, 'Số điện thoại không hợp lệ'),
    email: z
        .string()
        .trim()
        .min(1, 'Email không được để trống')
        .max(255, 'Email không được quá 255 ký tự')
        .email('Địa chỉ email không hợp lệ'),
    note: z.string().max(500, 'Nội dung yêu cầu không được quá 500 ký tự').optional(),
    interestContent: z.array(z.string()).min(1, 'Vui lòng chọn ít nhất một nội dung quan tâm'),
});


export const contactSchemaEn = z.object({
    fullName: z
        .string()
        .trim()
        .min(1, 'Full name is required')
        .max(255, 'Full name must not exceed 255 characters')
        .regex(specialCharRegexNoNumber, 'Full name must not contain numbers or special characters'),
    phoneNumber: z
        .string()
        .trim()
        .min(1, 'Phone number is required')
        .regex(regexPhoneNumber, 'Invalid phone number format'),
    email: z
        .string()
        .trim()
        .min(1, 'Email is required')
        .max(255, 'Email must not exceed 255 characters')
        .email('Invalid email address'),
    note: z.string().max(500, 'Note must not exceed 500 characters').optional(),
    interestContent: z.array(z.string()).min(1, 'Please select at least one interest content'),
});