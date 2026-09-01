"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from "react";

export type CartItem = {
	productId: string;
	variantId?: string;
	slug: string;
	name: string;
	variantName?: string;
	price: number;
	image?: string;
	quantity: number;
};

type CartState = {
	items: CartItem[];
};

type CartAction =
	| { type: "add"; item: CartItem }
	| { type: "remove"; key: string }
	| { type: "setQuantity"; key: string; quantity: number }
	| { type: "clear" };

const STORAGE_KEY = "tachyon:cart:v1";

function itemKey(item: Pick<CartItem, "productId" | "variantId">) {
	return `${item.productId}:${item.variantId ?? "default"}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case "add": {
			const key = itemKey(action.item);
			const existing = state.items.find((i) => itemKey(i) === key);
			if (existing) {
				return {
					items: state.items.map((i) =>
						itemKey(i) === key
							? { ...i, quantity: i.quantity + action.item.quantity }
							: i,
					),
				};
			}
			return { items: [...state.items, action.item] };
		}
		case "remove":
			return { items: state.items.filter((i) => itemKey(i) !== action.key) };
		case "setQuantity": {
			if (action.quantity <= 0) {
				return { items: state.items.filter((i) => itemKey(i) !== action.key) };
			}
			return {
				items: state.items.map((i) =>
					itemKey(i) === action.key ? { ...i, quantity: action.quantity } : i,
				),
			};
		}
		case "clear":
			return { items: [] };
	}
}

type CartContextValue = {
	items: CartItem[];
	count: number;
	subtotal: number;
	addItem: (item: CartItem) => void;
	removeItem: (key: string) => void;
	setQuantity: (key: string, quantity: number) => void;
	clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartState {
	if (typeof window === "undefined") {
		return { items: [] };
	}
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) {
			return { items: [] };
		}
		const parsed = JSON.parse(raw) as { items?: CartItem[] };
		return { items: Array.isArray(parsed.items) ? parsed.items : [] };
	} catch {
		return { items: [] };
	}
}

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

	useEffect(() => {
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		} catch {
			// ignore quota / serialization errors
		}
	}, [state]);

	const addItem = useCallback((item: CartItem) => {
		dispatch({ type: "add", item });
	}, []);

	const removeItem = useCallback((key: string) => {
		dispatch({ type: "remove", key });
	}, []);

	const setQuantity = useCallback((key: string, quantity: number) => {
		dispatch({ type: "setQuantity", key, quantity });
	}, []);

	const clear = useCallback(() => {
		dispatch({ type: "clear" });
	}, []);

	const value = useMemo<CartContextValue>(() => {
		const count = state.items.reduce((sum, item) => sum + item.quantity, 0);
		const subtotal = state.items.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0,
		);
		return {
			items: state.items,
			count,
			subtotal,
			addItem,
			removeItem,
			setQuantity,
			clear,
		};
	}, [state, addItem, removeItem, setQuantity, clear]);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}

export { itemKey };
