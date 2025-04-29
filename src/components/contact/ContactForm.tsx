'use client';

import { contactService } from '@/services/contactService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ButtonRed from '../common/ButtonRed';
import MultiSelect from '../common/SelectMultiple';

export interface FormDataContact {
    fullName: string;
    phoneNumber: string;
    email: string;
    note?: string;
    interestContent: string[];
}

import { Locale } from '@/types/common';
import { useParams } from 'next/navigation';
import { productService } from '@/services/productService';
import { contactSchemaEn, contactSchemaVi } from '@/schemas/contactSchema';

export const ContactForm = () => {
    const { t } = useTranslation('contact');
    const params = useParams<{ slug: string; locale: Locale }>();
    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
    }, []);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormDataContact>({
        resolver: zodResolver(params.locale === 'vi' ? contactSchemaVi : contactSchemaEn),
        defaultValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            note: '',
            interestContent: [],
        },
    });

    const createContact = useMutation({
        mutationFn: (data: FormDataContact) => contactService.createContactCustomer(data),
        onSuccess: () => {
            toast.success(
                params.locale === 'vi'
                    ? 'Đã gửi yêu cầu thành công!'
                    : 'Form submitted successfully!'
            );
        },
        onError: () => {
            toast.error(
                params.locale === 'vi'
                    ? 'Đã xảy ra lỗi khi gửi yêu cầu! Vui lòng thử lại'
                    : 'Error submitting form! Please try again.'
            );
        },
    });

    const { data: dataProducts } = useQuery({
        queryKey: ['serviceProduct'],
        queryFn: () => productService.getProducts(params.locale),
    });

    const onSubmit = (data: FormDataContact) => {
        console.log(data);
        createContact.mutate(data);
    };

    return (
        <>
            <h2 className="mb-4 text-center text-4xl font-bold text-[#fe0000] dark:text-white">
                {t('form.title')}
            </h2>
            <p className="mb-6 text-center text-xl text-[#2C2C2C] dark:text-gray-300">
                {t('form.description')}
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <input
                            type="text"
                            {...register('fullName')}
                            placeholder={t('form.fullName')}
                            className="h-12 w-full rounded-[22px] border border-[#D6D6D6] bg-white p-4 text-base dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                        />
                        {errors.fullName && (
                            <p className="text-sm text-red-500">{errors.fullName.message}</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            {...register('phoneNumber')}
                            placeholder={t('form.phoneNumber')}
                            className="h-12 w-full rounded-[22px] border border-[#D6D6D6] bg-white p-4 text-base dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                        />
                        {errors.phoneNumber && (
                            <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
                        )}
                    </div>
                </div>
                <div>
                    <input
                        type="email"
                        {...register('email')}
                        placeholder={t('form.email')}
                        className="h-12 w-full rounded-[22px] border border-[#D6D6D6] bg-white p-4 text-base dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                    <Controller
                        name="interestContent"
                        control={control}
                        render={({ field }) => (
                            <MultiSelect
                                onChange={(selected) => field.onChange(selected ?? [])}
                                value={field.value}
                                options={
                                    dataProducts?.data?.content?.map(
                                        (item: { id: string; name: string }) => ({
                                            value: item.name,
                                            label: item.name,
                                        })
                                    ) || []
                                }
                                placeholder={t('form.selectInterest')}
                                placeholderNoptions={t('form.no-options')}
                            />
                        )}
                    />
                    {errors.interestContent && (
                        <p className="text-sm text-red-500">{errors.interestContent.message}</p>
                    )}
                </div>
                <div>
                    <textarea
                        {...register('note')}
                        placeholder={t('form.message')}
                        className="h-32 w-full rounded-[22px] border border-[#D6D6D6] bg-white p-4 text-base dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    />
                    {errors.note && <p className="text-sm text-red-500">{errors.note.message}</p>}
                </div>
                <div className="w-fit">
                    <ButtonRed className="w-fit px-[20px] py-[10px] text-base">
                        {t('form.submit')}
                    </ButtonRed>
                </div>
            </form>
        </>
    );
};
