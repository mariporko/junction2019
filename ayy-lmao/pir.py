import RPi.GPIO as GPIO
import time

LED_PIN = 3
PIR_PIN = 11


def pir_isr_cb(PIR_PIN):
    GPIO.output(LED_PIN, 1)


GPIO.setmode(GPIO.BOARD)
GPIO.setup(LED_PIN, GPIO.OUT)
GPIO.setup(PIR_PIN, GPIO.IN)

try:
    GPIO.add_event_detect(PIR_PIN, GPIO.RISING, callback=pir_isr_cb)
    while 1:
        # if GPIO.input(PIR_PIN):
        #     GPIO.output(LED_PIN, 1)
        # else:
        #     GPIO.OUTPUT(LED_PIN, 0)

        time.sleep(100)
except:
    GPIO.cleanup()
