// 'use client';

// import { useState, useEffect } from 'react';
// import { FaEye, FaTrash, FaFilter, FaSearch, FaReply } from 'react-icons/fa';
// import { MdMarkEmailRead, MdArchive } from 'react-icons/md';
// import Sidebar from '@/app/components/common/Sidebar';

// const STATUS_COLORS = {
//     UNREAD: 'bg-red-100 text-red-800',
//     READ: 'bg-blue-100 text-blue-800',
//     REPLIED: 'bg-green-100 text-green-800',
//     ARCHIVED: 'bg-gray-100 text-gray-800'
// };

// const STATUS_LABELS = {
//     UNREAD: 'Chưa đọc',
//     READ: 'Đã đọc',
//     REPLIED: 'Đã trả lời',
//     ARCHIVED: 'Đã lưu trữ'
// };

// export default function ContactsDashboard() {
//     const [contacts, setContacts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedContacts, setSelectedContacts] = useState([]);
//     const [statusFilter, setStatusFilter] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [pagination, setPagination] = useState({});
//     const [selectedContact, setSelectedContact] = useState(null);
//     const [showDetailModal, setShowDetailModal] = useState(false);

//     useEffect(() => {
//         fetchContacts();
//     }, [statusFilter, currentPage]);

//     const fetchContacts = async () => {
//         try {
//             setLoading(true);
//             const params = new URLSearchParams({
//                 page: currentPage.toString(),
//                 limit: '10'
//             });

//             if (statusFilter) params.append('status', statusFilter);

//             const response = await fetch(`/api/contacts?${params}`);
//             const data = await response.json();

//             if (response.ok) {
//                 setContacts(data.contacts);
//                 setPagination(data.pagination);
//             } else {
//                 console.error('Error fetching contacts:', data.error);
//             }
//         } catch (error) {
//             console.error('Error fetching contacts:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSelectContact = (contactId) => {
//         setSelectedContacts(prev =>
//             prev.includes(contactId)
//                 ? prev.filter(id => id !== contactId)
//                 : [...prev, contactId]
//         );
//     };

//     const handleSelectAll = () => {
//         if (selectedContacts.length === contacts.length) {
//             setSelectedContacts([]);
//         } else {
//             setSelectedContacts(contacts.map(contact => contact.id));
//         }
//     };

//     const updateContactStatus = async (contactId, newStatus) => {
//         try {
//             const response = await fetch(`/api/contacts/${contactId}`, {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ status: newStatus })
//             });

//             if (response.ok) {
//                 fetchContacts();
//                 setSelectedContacts([]);
//             }
//         } catch (error) {
//             console.error('Error updating contact:', error);
//         }
//     };

//     const deleteContacts = async (contactIds) => {
//         if (!confirm(`Bạn có chắc muốn xóa ${contactIds.length} liên hệ?`)) return;

//         try {
//             const response = await fetch(`/api/contacts?ids=${contactIds.join(',')}`, {
//                 method: 'DELETE'
//             });

//             if (response.ok) {
//                 fetchContacts();
//                 setSelectedContacts([]);
//             }
//         } catch (error) {
//             console.error('Error deleting contacts:', error);
//         }
//     };

//     const viewContactDetail = async (contactId) => {
//         try {
//             const response = await fetch(`/api/contacts/${contactId}`);
//             const contact = await response.json();

//             if (response.ok) {
//                 setSelectedContact(contact);
//                 setShowDetailModal(true);
//                 fetchContacts(); // Refresh để cập nhật status
//             }
//         } catch (error) {
//             console.error('Error fetching contact detail:', error);
//         }
//     };

//     const filteredContacts = contacts.filter(contact =>
//         contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('vi-VN', {
//             day: '2-digit',
//             month: '2-digit',
//             year: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-50">
//             {/* Sidebar */}
//             <Sidebar />
//             {/* Main Content */}
//             <div className="max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý Liên hệ</h1>
//                     <p className="text-gray-600">Xem và quản lý tất cả các liên hệ từ khách hàng</p>
//                 </div>

//                 {/* Filters and Actions */}
//                 <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//                     <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//                         {/* Search */}
//                         <div className="relative flex-1 max-w-md">
//                             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                             <input
//                                 type="text"
//                                 placeholder="Tìm kiếm liên hệ..."
//                                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                         </div>

//                         {/* Status Filter */}
//                         <div className="flex items-center gap-2">
//                             <FaFilter className="text-gray-400" />
//                             <select
//                                 className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                                 value={statusFilter}
//                                 onChange={(e) => setStatusFilter(e.target.value)}
//                             >
//                                 <option value="">Tất cả trạng thái</option>
//                                 <option value="UNREAD">Chưa đọc</option>
//                                 <option value="READ">Đã đọc</option>
//                                 <option value="REPLIED">Đã trả lời</option>
//                                 <option value="ARCHIVED">Đã lưu trữ</option>
//                             </select>
//                         </div>

//                         {/* Bulk Actions */}
//                         {selectedContacts.length > 0 && (
//                             <div className="flex gap-2">
//                                 <button
//                                     onClick={() => selectedContacts.forEach(id => updateContactStatus(id, 'READ'))}
//                                     className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                                 >
//                                     <MdMarkEmailRead />
//                                     Đánh dấu đã đọc
//                                 </button>
//                                 <button
//                                     onClick={() => selectedContacts.forEach(id => updateContactStatus(id, 'ARCHIVED'))}
//                                     className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//                                 >
//                                     <MdArchive />
//                                     Lưu trữ
//                                 </button>
//                                 <button
//                                     onClick={() => deleteContacts(selectedContacts)}
//                                     className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                                 >
//                                     <FaTrash />
//                                     Xóa
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Table */}
//                 <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//                     {loading ? (
//                         <div className="flex justify-center items-center h-64">
//                             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//                         </div>
//                     ) : (
//                         <>
//                             <div className="overflow-x-auto">
//                                 <table className="w-full">
//                                     <thead className="bg-gray-50">
//                                         <tr>
//                                             <th className="px-6 py-3 text-left">
//                                                 <input
//                                                     type="checkbox"
//                                                     checked={selectedContacts.length === contacts.length && contacts.length > 0}
//                                                     onChange={handleSelectAll}
//                                                     className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                                                 />
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Tên & Email
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Tiêu đề
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Trạng thái
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Ngày gửi
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Hành động
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="bg-white divide-y divide-gray-200">
//                                         {filteredContacts.map((contact) => (
//                                             <tr key={contact.id} className="hover:bg-gray-50">
//                                                 <td className="px-6 py-4">
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={selectedContacts.includes(contact.id)}
//                                                         onChange={() => handleSelectContact(contact.id)}
//                                                         className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                                                     />
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                     <div>
//                                                         <div className="text-sm font-medium text-gray-900">{contact.name}</div>
//                                                         <div className="text-sm text-gray-500">{contact.email}</div>
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                     <div className="text-sm text-gray-900 max-w-xs truncate">
//                                                         {contact.subject}
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${STATUS_COLORS[contact.status]}`}>
//                                                         {STATUS_LABELS[contact.status]}
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-6 py-4 text-sm text-gray-500">
//                                                     {formatDate(contact.createdAt)}
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                     <div className="flex space-x-2">
//                                                         <button
//                                                             onClick={() => viewContactDetail(contact.id)}
//                                                             className="text-blue-600 hover:text-blue-800"
//                                                             title="Xem chi tiết"
//                                                         >
//                                                             <FaEye />
//                                                         </button>
//                                                         {contact.status !== 'REPLIED' && (
//                                                             <button
//                                                                 onClick={() => updateContactStatus(contact.id, 'REPLIED')}
//                                                                 className="text-green-600 hover:text-green-800"
//                                                                 title="Đánh dấu đã trả lời"
//                                                             >
//                                                                 <FaReply />
//                                                             </button>
//                                                         )}
//                                                         <button
//                                                             onClick={() => deleteContacts([contact.id])}
//                                                             className="text-red-600 hover:text-red-800"
//                                                             title="Xóa"
//                                                         >
//                                                             <FaTrash />
//                                                         </button>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>

//                             {/* Pagination */}
//                             {pagination.total > 1 && (
//                                 <div className="px-6 py-3 bg-gray-50 border-t flex items-center justify-between">
//                                     <div className="text-sm text-gray-700">
//                                         Hiển thị {filteredContacts.length} trên {pagination.count} liên hệ
//                                     </div>
//                                     <div className="flex space-x-2">
//                                         <button
//                                             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                                             disabled={currentPage === 1}
//                                             className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                                         >
//                                             Trước
//                                         </button>
//                                         <span className="px-3 py-1 bg-blue-600 text-white rounded-md">
//                                             {currentPage}
//                                         </span>
//                                         <button
//                                             onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.total))}
//                                             disabled={currentPage === pagination.total}
//                                             className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                                         >
//                                             Sau
//                                         </button>
//                                     </div>
//                                 </div>
//                             )}
//                         </>
//                     )}
//                 </div>
//             </div>

//             {/* Detail Modal */}
//             {showDetailModal && selectedContact && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                     <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//                         <div className="p-6">
//                             <div className="flex justify-between items-start mb-4">
//                                 <h2 className="text-2xl font-bold text-gray-900">Chi tiết liên hệ</h2>
//                                 <button
//                                     onClick={() => setShowDetailModal(false)}
//                                     className="text-gray-400 hover:text-gray-600"
//                                 >
//                                     ✕
//                                 </button>
//                             </div>

//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
//                                     <p className="text-gray-900">{selectedContact.name}</p>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                                     <p className="text-gray-900">{selectedContact.email}</p>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
//                                     <p className="text-gray-900">{selectedContact.subject}</p>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
//                                     <div className="bg-gray-50 p-4 rounded-lg">
//                                         <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center gap-4">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
//                                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${STATUS_COLORS[selectedContact.status]}`}>
//                                             {STATUS_LABELS[selectedContact.status]}
//                                         </span>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">Ngày gửi</label>
//                                         <p className="text-gray-900">{formatDate(selectedContact.createdAt)}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex gap-2 pt-4">
//                                     <button
//                                         onClick={() => {
//                                             updateContactStatus(selectedContact.id, 'REPLIED');
//                                             setShowDetailModal(false);
//                                         }}
//                                         className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                                     >
//                                         <FaReply />
//                                         Đánh dấu đã trả lời
//                                     </button>
//                                     <button
//                                         onClick={() => {
//                                             updateContactStatus(selectedContact.id, 'ARCHIVED');
//                                             setShowDetailModal(false);
//                                         }}
//                                         className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//                                     >
//                                         <MdArchive />
//                                         Lưu trữ
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div >
//     );
// }
