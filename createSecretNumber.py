def create_bytes32(nonce, number):
    # Convierte el nonce en una representación de bytes UTF-8
    nonce_bytes = nonce.encode('utf-8')

    # Asegura que la longitud del nonce sea 32 bytes
    if len(nonce_bytes) > 16:
        nonce_bytes = nonce_bytes[:16]
    elif len(nonce_bytes) < 16:
        nonce_bytes = nonce_bytes.ljust(16, b'\0')

    # Convierte el número en una representación de bytes de 32 bytes (big-endian)
    number_bytes = number.to_bytes(16, byteorder='big')

    # Combina los bytes del nonce y el número para obtener un valor bytes32
    result_bytes = nonce_bytes + number_bytes

    return result_bytes

# Ejemplo de uso
nonce = "jugador2"
number = 1
bytes32_value = create_bytes32(nonce, number)
print(f"Nonce: {nonce}")
print(f"Number: {number}")
print(f"Bytes32 Value: 0x{bytes32_value.hex()}")
