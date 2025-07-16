import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ServiceList from '../../components/admin/ServiceList';
import { getServices, createService, updateService, deleteService } from '../../lib/api';
import type { Service } from '../../types/service';

export default function AdminDashboard() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                router.replace('/admin/login');
            }
        }
    }, [router]);

    useEffect(() => {
        const fetchServices = async () => {
        try {
            const data = await getServices();
            setServices(data);
        } catch (error) {
            console.error('Failed to fetch services', error);
        } finally {
            setLoading(false);
        }
        };
        fetchServices();
    }, []);

    const handleAdd = async (serviceData: Omit<Service, '_id'>) => {
        try {
        const newService = await createService(serviceData);
        setServices(prev => [...prev, newService]);
        } catch (error) {
        console.error('Failed to create service', error);
        }
    };

    const handleUpdate = async (id: string, serviceData: Omit<Service, '_id'>) => {
        try {
        const updatedService = await updateService(id, serviceData);
        setServices(prev => prev.map(s => s._id === id ? updatedService : s));
        } catch (error) {
        console.error('Failed to update service', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
        await deleteService(id);
        setServices(prev => prev.filter(s => s._id !== id));
        } catch (error) {
        console.error('Failed to delete service', error);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
            <ServiceList
            services={services}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            />
        </div>
        </div>
    );
}