def create_bytes32(nonce, number):
    # Convierte el nonce en una representación de bytes de 32 bytes (big-endian)
    nonce_bytes = nonce.to_bytes(16, byteorder='big')

    # Convierte el número en una representación de bytes de 32 bytes (big-endian)
    number_bytes = number.to_bytes(16, byteorder='big')

    # Combina los bytes del nonce y el número para obtener un valor bytes32
    result_bytes = nonce_bytes + number_bytes

    return result_bytes

# Ejemplo de uso
nonce = 12345  # Cambia este valor a tu número deseado
number = 1
bytes32_value = create_bytes32(nonce, number)
print(f"Nonce: {nonce}")
print(f"Number: {number}")
print(f"Bytes32 Value: 0x{bytes32_value.hex()}")
