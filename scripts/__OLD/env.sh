#!/bin/bash
set -x

export $(sed -e '/^#/d' .env | xargs)
