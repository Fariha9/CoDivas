import { useEffect, useState } from "react";
import axios from "axios";
import { Receipt, CheckCircle2, XCircle, Clock } from "lucide-react";

const PaymentHistory = () => {
    const [filter, setFilter] = useState("All");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");

const res = await axios.get(
  "http://localhost:5001/api/payment/history",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
        setPayments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const getStatusStyle = (status) => {
    const styles = {
      success: { badge: "bg-green-500/10 text-green-400 border-green-500/20", icon: CheckCircle2 },
      completed: { badge: "bg-green-500/10 text-green-400 border-green-500/20", icon: CheckCircle2 },
      failed: { badge: "bg-red-500/10 text-red-400 border-red-500/20", icon: XCircle },
      pending: { badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", icon: Clock },
    };
    
    return styles[status?.toLowerCase()] || styles.pending;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading payment history...</p>
        </div>
      </div>
    );
  }
const filteredPayments =
  filter === "All"
    ? payments
    : payments.filter(
        (payment) => payment.status.toLowerCase() === filter.toLowerCase()
      );
  return (
    <div className="min-h-screen bg-[#0d0d0f] p-8 relative overflow-hidden">

      {/* Glow blob */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-700/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="mb-8 relative z-10">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-full px-4 py-1 mb-4">
          ✦ Billing
        </span>
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">
          Payment <span className="text-purple-400">History</span>
        </h1>
        <p className="text-gray-500 mt-1">
          View all your past transactions and their status
        </p>
      </div>
      <div className="flex gap-3 px-6 py-4 border-b border-white/10">
  {["All", "Completed", "Pending", "Failed", "Cancelled"].map((item) => (
    <button
      key={item}
      onClick={() => setFilter(item)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
        filter === item
          ? "bg-purple-600 text-white"
          : "bg-[#242429] text-gray-400 hover:bg-[#2f2f35] hover:text-white"
      }`}
    >
      {item}
    </button>
  ))}
</div>

      {/* Table / List */}
      <div className="bg-[#18181c] border border-white/10 rounded-2xl overflow-hidden relative z-10">

        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <Receipt className="text-purple-400 w-5 h-5" /> Transactions
          </h3>
          <span className="text-xs text-gray-500 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            {filteredPayments.length} total
          </span>
        </div>

        {filteredPayments.length === 0 ? (
          <div className="text-center text-gray-600 py-16">
            <Receipt className="text-gray-700 text-4xl mx-auto mb-3" />
            <p>No payment history yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gray-500 text-xs uppercase tracking-widest">
                  <th className="text-left px-6 py-3">Transaction ID</th>
                  <th className="text-left px-6 py-3">Amount</th>
                  <th className="text-left px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
               {filteredPayments.map((payment) => {
                  const { badge, icon: Icon } = getStatusStyle(payment.status);
                  return (
                    <tr
                      key={payment._id}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                        {payment.transactionId}
                      </td>
                      <td className="px-6 py-4 text-white font-semibold">
                        {payment.amount} BDT
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border capitalize ${badge}`}>
                          <Icon size={12} />
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;