import { FormDataContact } from "@/components/contact/ContactForm";
import api from "@/config/axios";

class ContactService {
    
    async createContactCustomer(data:FormDataContact) {
        const response = await api.post('/customers', data);
        return response.data;
    }
}

export const contactService = new ContactService();
