// 'use client';

// import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import type { WishlistItem } from '../types/wishlist';
// import { createClient } from '@/utils/supabase/client';
// import toast from 'react-hot-toast';

// type WishlistContextType = {
//   wishlist: WishlistItem[];
//   toggleWishlist: (item: WishlistItem) => void;
//   isInWishlist: (item: WishlistItem) => boolean;
//   removeFromWishlist: (item: WishlistItem) => Promise<void>
// };

// const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// export const WishlistProvider = ({ children }: { children: ReactNode }) => {
//   const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
//   const [userId, setUserId] = useState<string | null>(null);
//   const supabase = createClient();

//   // get user id and wishlist items
//   useEffect(() => {
//     const getUserAndWishlist = async () => {
//       const { data: { user}} = await supabase.auth.getUser();

//       if (user) {
//         setUserId(user.id);

//         const { data, error } = await supabase
//           .from('wishlist')
//           .select('*, products (id, name, price, image)')
//           .eq('user_id', user.id);

//         if (!error && data) {
//           setWishlist(data);
//         }
//       }
//     }

//     getUserAndWishlist();
//   }, [supabase]);


//   const toggleWishlist = async (item: WishlistItem) => {
//     if (!userId) return;

//     // ✅ Ensure we’re comparing the same field name consistently
//     const productId = item.product_id || item.id;
//     const productName = item.products?.name || 'product';

//     const exists = wishlist.find(wishlistItem => wishlistItem.product_id === productId && wishlistItem.size === item.size && wishlistItem.color === item.color && wishlistItem.user_id === userId);

//     if (exists) {
//       // 🗑️ Remove from wishlist
//       const { error, data } = await supabase
//         .from('wishlist')
//         .delete()
//         .eq('user_id', userId) // ✅ make sure we only delete for this user
//         .eq('product_id', productId)
//         .select(`*, products (id, name, price, image)`);

//       if (error) {
//         console.error('Supabase error:', error);
//         toast.error('Something went wrong while removing from wishlist.');
//         return;
//       }

//       if (data) {
//         setWishlist(prev =>
//           prev.filter(wishlistItem => wishlistItem.product_id !== productId)
//         );
//       }

//        toast.success(`${productName} removed from wishlist!`, {
//                 duration: 3000,
//                 position: 'top-center',
//                 style: {
//                     background: '#fff',
//                     color: '#000',
//                     borderRadius: '8px',
//                     padding: '16px',
//                     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//                     textAlign: 'center',
//                 },
//             });

//     } else {
//       // 💖 Add to wishlist (use upsert to avoid duplicates safely)
//       const { error, data } = await supabase
//         .from('wishlist')
//         .upsert(
//           [{ user_id: userId, product_id: productId, size: item.size, color: item.color }],
//         )
//         .select(`*, products (id, name, price, image)`);

//       if (error) {
//         console.error('Supabase error:', error);
//         toast.error('Something went wrong while adding to wishlist.');
//         return;
//       }

//       if (data && data.length > 0) {
//         setWishlist(prev => [...prev, data[0]]);
//       }
//       toast.success(`${productName} added to wishlist!`, {
//         duration: 3000,
//         position: 'top-center',
//         style: {
//             background: '#fff',
//             color: '#000',
//             borderRadius: '8px',
//             padding: '16px',
//             boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//         },
//       });
//     }
//   };

    

//   const isInWishlist = (item: WishlistItem) => {
//     const itemIsInWishlist = wishlist.some(wishlistItem => wishlistItem.product_id === item.id);
//     return itemIsInWishlist
//   }


//   // Remove from cart
//   const removeFromWishlist = async (wishlistItem: WishlistItem) => {
//     if (!userId) return;

//     const { error } = await supabase
//       .from('wishlist')
//       .delete()
//       .eq('user_id', userId)
//       .eq('product_id', wishlistItem.product_id)
//       .eq('size', wishlistItem.size)
//       .eq('color', wishlistItem.color);

//     if (!error) {
//       setWishlist((prevWishlist) =>
//         prevWishlist.filter(
//           (item) =>
//             !(
//               item.product_id === wishlistItem.product_id &&
//               item.size === wishlistItem.size &&
//               item.color === wishlistItem.color &&
//               item.user_id === userId
//             )
//         )
//       );
//     }
//   };


//   return (
//     <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, removeFromWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => {
//   const context = useContext(WishlistContext);
//   if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
//   return context;
// };
