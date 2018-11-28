@echo off
grunt --force && copy app\fonts dist\fonts && mkdir dist\json && copy app\json dist\json