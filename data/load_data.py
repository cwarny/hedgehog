from elasticsearch import Elasticsearch
import os

es = Elasticsearch()

foldername = 'tim_oreilly_activities'
folder = os.listdir(foldername)

for i, fn in enumerate(folder):
	with open(foldername + '/' + fn) as f:
		doc = f.read().strip()
		es.index('tim', 'doc', { 'body': doc }, i)