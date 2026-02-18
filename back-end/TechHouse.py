import datetime
import sys

def discount_rate(membership):
    return {
        "Bronze": 0.05,
        "Silver": 0.08,
        "Gold": 0.10,
        "Business": 0.15
    }.get(membership, 0.0)


# ------------------ MODELS ------------------

class Appliance:
    def __init__(self, id, name, price, category, stock):
        self.id = id
        self.name = name
        self.price = price
        self.category = category
        self.stock = stock

    def __str__(self):
        return f"[{self.id}] {self.name} | ${self.price:.2f} | Stock: {self.stock} | Category: {self.category}"


class Customer:
    def __init__(self, id, name, address, membership="None"):
        self.id = id
        self.name = name
        self.address = address
        self.membership = membership
        self.purchases = []  

    def __str__(self):
        return f"ID: {self.id}\nName: {self.name}\nAddress: {self.address}\nMembership: {self.membership}"


class Sale:
    def __init__(self, appliance, price, discount, final_price, delivery_method):
        self.appliance = appliance
        self.price = price
        self.discount = discount
        self.final_price = final_price
        self.delivery_method = delivery_method
        self.time = datetime.datetime.now()


class CartItem:
    def __init__(self, appliance):
        self.appliance = appliance


# ------------------ DATABASE ------------------

class Database:
    def __init__(self):
        self.appliances = []
        self.next_id = 1

        # Predefined appliances
        self.add("Mixer", 50, "Kitchen", 5)
        self.add("Oven", 300, "Kitchen", 3)
        self.add("Blender", 40, "Kitchen", 10)
        self.add("Vacuum Cleaner", 130, "Cleaning", 6)
        self.add("Air Conditioner", 400, "Heating & Cooling", 4)
        self.add("Hair Dryer", 30, "Personal Care", 8)
        self.add("Smart Thermostat", 200, "Smart Home", 2)

    def add(self, name, price, category, stock):
        self.appliances.append(Appliance(self.next_id, name, price, category, stock))
        self.next_id += 1

    def get_by_id(self, id):
        for a in self.appliances:
            if a.id == id:
                return a
        return None

    def search(self, text):
        return [a for a in self.appliances if text.lower() in a.name.lower()]

    def categories(self):
        return sorted(set(a.category for a in self.appliances))


# ------------------ CART ------------------

class ShoppingCart:
    def __init__(self):
        self.items = []

    def add(self, appliance):
        if appliance.stock <= 0:
            print("Out of stock.")
            return
        self.items.append(CartItem(appliance))
        print(f"{appliance.name} added to cart.")

    def remove(self, index):
        if 0 <= index < len(self.items):
            removed = self.items.pop(index)
            print(f"{removed.appliance.name} removed from cart.")

    def view(self, customer):
        if not self.items:
            print("Cart is empty.")
            return

        rate = discount_rate(customer.membership)
        total = 0

        print("\n--- CART ---")
        for i, item in enumerate(self.items):
            p = item.appliance.price
            d = p * rate
            fp = p - d
            total += fp
            print(f"{i+1}. {item.appliance.name} | ${p:.2f} - ${d:.2f} = ${fp:.2f}")

        print(f"\nTOTAL: ${total:.2f}")

        print("\n1. Remove item")
        print("2. Complete order")
        print("3. Back")
        choice = input("Choose: ")

        if choice == "1":
            idx = int(input("Item number: ")) - 1
            self.remove(idx)
        elif choice == "2":
            self.checkout(customer)

    def checkout(self, customer):
        if not self.items:
            print("Cart is empty.")
            return

        rate = discount_rate(customer.membership)

        print("\n--- ORDER SUMMARY ---")
        total = 0
        for item in self.items:
            a = item.appliance
            discount = a.price * rate
            final_price = a.price - discount
            total += final_price
            print(f"{a.name} | ${a.price:.2f} - ${discount:.2f} = ${final_price:.2f}")

        print(f"\nTOTAL TO PAY: ${total:.2f}")
        print(f"Membership discount applied: {customer.membership}")

        # Payment method
        payment = input("\nPayment method (cash/card): ").lower()
        if payment not in ["cash", "card"]:
            print("Invalid payment method. Order cancelled.")
            return

        # Delivery or pickup
        delivery_method = input("Choose delivery method (delivery/pickup): ").lower()
        if delivery_method not in ["delivery", "pickup"]:
            print("Invalid choice. Order cancelled.")
            return

        # Confirmation
        confirm = input("Proceed with order? (y/n): ").lower()
        if confirm != "y":
            print("Order cancelled.")
            return

        # ---- COMPLETE ORDER ----
        for item in self.items:
            a = item.appliance
            discount = a.price * rate
            final_price = a.price - discount

            customer.purchases.append(
                Sale(a.name, a.price, discount, final_price, delivery_method)
            )
            a.stock -= 1

        print(f"\n-${sum(s.discount for s in customer.purchases[-len(self.items):]):.2f} discount for {customer.membership}")
        print(f"Delivery method chosen: {delivery_method}")
        print("Order completed successfully.")

        self.items.clear()


# ------------------ MENUS ------------------

def view_appliances(db, cart):
    for a in db.appliances:
        print(a)

    print("\n1. Add to cart")
    print("2. View product info")
    print("3. Back")
    choice = input("Choose: ")

    if choice == "1":
        id = int(input("Product ID: "))
        a = db.get_by_id(id)
        if a:
            cart.add(a)
    elif choice == "2":
        id = int(input("Product ID: "))
        a = db.get_by_id(id)
        if a:
            print(a)


def search_menu(db, cart):
    print("\n1. Search by text")
    print("2. Browse by category")
    choice = input("Choose: ")

    if choice == "1":
        text = input("Enter text: ")
        for a in db.search(text):
            print(a)
    elif choice == "2":
        cats = db.categories()
        for i, c in enumerate(cats):
            print(f"{i+1}. {c}")
        idx = int(input("Choose: ")) - 1
        for a in db.appliances:
            if a.category == cats[idx]:
                print(a)


def membership_menu(customer):
    print(f"\nCurrent membership: {customer.membership}")
    if customer.membership == "None":
        print("1. Become a member")
    else:
        print("1. Change membership")
    print("2. Back")
    choice = input("Choose: ")

    if choice == "1":
        print("\n1. Bronze\n2. Silver\n3. Gold\n4. Business")
        m = input("Choose: ")
        customer.membership = ["Bronze", "Silver", "Gold", "Business"][int(m)-1]
        print("Membership updated.")


def user_profile(customer):
    print("\n--- USER PROFILE ---")
    print(customer)

    print("\n--- PURCHASE HISTORY ---")
    if not customer.purchases:
        print("No purchases.")
    else:
        for s in customer.purchases:
            print(f"{s.appliance} | ${s.price:.2f} - ${s.discount:.2f} = ${s.final_price:.2f} | {s.time.strftime('%H:%M')} | {s.delivery_method}")


def contact_support():
    print("\nContact Support")
    print("Email: support@techhouse.com")
    print("Phone: +1-800-TECH-HOUSE")


# ------------------ MAIN ------------------

def main():
    db = Database()
    cart = ShoppingCart()

    print("Welcome to Tech House")

    customer = Customer(
        1,
        input("Name: "),
        input("Address: "),
        input("Membership (Bronze/Silver/Gold/Business/None): ")
    )

    while True:
        print("""
1. View appliances
2. Search appliances
3. View cart
4. Promotions & Membership
5. User profile
6. Add new appliance (admin)
7. Contact support
8. Exit
""")

        choice = input("Choose: ")

        if choice == "1":
            view_appliances(db, cart)
        elif choice == "2":
            search_menu(db, cart)
        elif choice == "3":
            cart.view(customer)
        elif choice == "4":
            membership_menu(customer)
        elif choice == "5":
            user_profile(customer)
        elif choice == "6":
            # Admin: add appliance
            name = input("Appliance name: ")
            price = float(input("Price: "))
            category = input("Category: ")
            stock = int(input("Stock quantity: "))
            db.add(name, price, category, stock)
            print(f"{name} added successfully.")
        elif choice == "7":
            contact_support()
        elif choice == "8":
            sys.exit()


main()
